using Microsoft.AspNetCore.Mvc;
using PokemonApi.Contracts.Requests;
using PokemonApi.Contracts.Responses;
using PokemonApi.Services;

namespace PokemonApi.Endpoints;

public static class SearchEndpoints
{
    public static RouteGroupBuilder MapSearchEndpoints(this RouteGroupBuilder group)
    {
        group
            .MapGet("/search", Search)
            .WithTags("Pokemon")
            .WithName("SearchPokemon")
            .WithSummary("Search for Pokemon by name using fuzzy matching")
            .Produces(StatusCodes.Status200OK, typeof(PokemonSummaryResponse[]))
            .ProducesValidationProblem();

        return group;
    }

    internal static IResult Search(
        [FromServices] IPokemonSearchService searchService,
        [AsParameters] SearchPokemonRequest request
    )
    {
        var results = searchService.Search(request.Q);
        return TypedResults.Ok(results);
    }
}
