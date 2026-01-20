using PokemonApi.Services;
using PokemonApi.Models;

namespace PokemonApi.Tests;

public sealed class StubNtpService : INtpService
{
    private readonly DateTimeOffset _time;

    public StubNtpService(DateTimeOffset time)
    {
        _time = time;
    }

    public Task<DateTimeOffset> GetNetworkTimeAsync()
    {
        return Task.FromResult(_time);
    }
}

public sealed class StubPokemonDetailsService : IPokemonDetailsService
{
    private readonly Dictionary<int, PokemonDetailsModel?> _pokemonById;

    public StubPokemonDetailsService(Dictionary<int, PokemonDetailsModel?> pokemonById)
    {
        _pokemonById = pokemonById;
    }

    public Task<PokemonDetailsModel?> GetPokemonAsync(int id, CancellationToken cancellationToken)
    {
        _pokemonById.TryGetValue(id, out var pokemon);
        return Task.FromResult(pokemon);
    }
}

public sealed class StubPokemonCatalog : IPokemonCatalog
{
    public StubPokemonCatalog(IEnumerable<PokemonSummary> pokemon)
    {
        var summaryList = pokemon.ToList();
        Names = summaryList.Select(entry => entry.Name).ToList();
        PokemonByName = summaryList.ToDictionary(entry => entry.Name, entry => entry, StringComparer.OrdinalIgnoreCase);
    }

    public IReadOnlyDictionary<string, PokemonSummary> PokemonByName { get; }

    public IReadOnlyList<string> Names { get; }
}
