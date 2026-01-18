using PokemonApi.Models;

namespace PokemonApi.Services;

public interface IPokemonCatalog
{
    IReadOnlyDictionary<string, PokemonSummary> PokemonByName { get; }
    IReadOnlyList<string> Names { get; }
}
