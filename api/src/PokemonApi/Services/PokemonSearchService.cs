using System.Collections.Frozen;
using System.Text.Json;
using FuzzySharp;
using PokemonApi.Models;

namespace PokemonApi.Services;

public class PokemonSearchService : IPokemonSearchService
{
    private readonly IReadOnlyList<string> _names;
    private readonly IReadOnlyDictionary<string, PokemonSummary> _pokemonByName;

    public PokemonSearchService(IWebHostEnvironment environment)
    {
        var json = File.ReadAllText(Path.Combine(environment.ContentRootPath, "pokemon.json"));
        var data =
            JsonSerializer
                .Deserialize<PokemonPayload>(
                    json,
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
                )
                ?.Data
            ?? throw new InvalidOperationException("Failed to deserialize pokemon.json");

        _names = data.Select(pokemon => pokemon.Name).ToArray();
        _pokemonByName = data.ToFrozenDictionary(
            pokemon => pokemon.Name,
            StringComparer.OrdinalIgnoreCase
        );
    }

    public IReadOnlyList<PokemonSummary> Search(string query, int limit = 10)
    {
        return Process
            .ExtractTop(query, _names, limit: limit)
            .Where(m => m.Score >= 50)
            .Select(m => _pokemonByName[m.Value])
            .ToArray();
    }

    public PokemonSummary? GetByName(string name)
    {
        return _pokemonByName.TryGetValue(name, out var pokemon) ? pokemon : null;
    }

    private record PokemonPayload(List<PokemonSummary> Data);
}
