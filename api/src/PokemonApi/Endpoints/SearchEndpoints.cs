using Microsoft.AspNetCore.Mvc;
using PokemonApi.Models;
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
            .Produces(StatusCodes.Status200OK, typeof(PokemonSummary[]))
            .ProducesProblem(StatusCodes.Status400BadRequest);

        return group;
    }

    internal static IResult Search(
        [FromServices] IPokemonSearchService searchService,
        [AsParameters] SearchRequest request
    )
    {
        var results = searchService.Search(request.Q.Trim().ToLowerInvariant());
        return TypedResults.Ok(results);
    }
}
