using PokemonApi.Contracts.Responses;

namespace PokemonApi.Services;

public interface IPokemonSearchService
{
    IReadOnlyList<PokemonSummaryResponse> Search(string query, int limit = 10);

    bool ExistsByName(string name);
}
