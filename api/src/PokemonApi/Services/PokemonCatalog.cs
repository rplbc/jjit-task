using System.Text.Json;
using PokemonApi.Models;

namespace PokemonApi.Services;

public class PokemonCatalog : IPokemonCatalog
{
    public PokemonCatalog(IWebHostEnvironment environment)
    {
        var jsonPath = Path.Combine(environment.ContentRootPath, "pokemon.json");

        if (!File.Exists(jsonPath))
        {
            throw new FileNotFoundException($"pokemon.json not found.");
        }

        var json = File.ReadAllText(jsonPath);
        var payload = JsonSerializer.Deserialize<PokemonPayload>(json, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
        });

        var pokemon = payload?.Data ?? throw new InvalidOperationException("pokemon.json is missing the data array.");
        var summaries = pokemon.Select(pokemon => new PokemonSummary(pokemon.Id, pokemon.Name)).ToArray();
        Names = summaries.Select(pokemon => pokemon.Name).ToArray();
        PokemonByName = summaries.ToDictionary(pokemon => pokemon.Name, StringComparer.OrdinalIgnoreCase);
    }

    public IReadOnlyDictionary<string, PokemonSummary> PokemonByName { get; }

    public IReadOnlyList<string> Names { get; }

    public record PokemonEntry(string Name, int Id);

    private record PokemonPayload(List<PokemonEntry> Data);
}
