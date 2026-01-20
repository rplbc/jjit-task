using PokemonApi.Models;

namespace PokemonApi.Services;

public interface IPokemonSearchService
{
    IReadOnlyList<PokemonSummary> Search(string query, int limit = 10);
}
