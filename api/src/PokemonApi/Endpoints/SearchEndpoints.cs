using FuzzySharp;
using Microsoft.AspNetCore.Mvc;
using PokemonApi.Models;
using PokemonApi.Services;
using System.ComponentModel.DataAnnotations;

namespace PokemonApi.Endpoints;

public static class SearchEndpoints
{
    public static RouteGroupBuilder MapSearchEndpoints(this RouteGroupBuilder group)
    {
        group
            .MapGet("/search", Search)
            .WithName("SearchPokemon")
            .WithSummary("Search for Pokemon by name using fuzzy matching")
            .Produces(StatusCodes.Status200OK, typeof(PokemonSummary[]))
            .ProducesProblem(StatusCodes.Status400BadRequest);

        return group;
    }

    internal static IResult Search(
        [FromServices] IPokemonCatalog catalog,
        [AsParameters] SearchRequest request)
    {
        var trimmedQuery = request.Q.Trim().ToLowerInvariant();
        var matches = Process.ExtractTop(trimmedQuery, catalog.Names, limit: 10);
        var results = matches
            .Where(match => match.Score >= 70)
            .Select(match => catalog.PokemonByName.TryGetValue(match.Value, out var pokemon) ? pokemon : null)
            .Where(pokemon => pokemon is not null)
            .Select(pokemon => pokemon!)
            .ToArray();

        return TypedResults.Ok(results);
    }

    public sealed class SearchRequest
    {
        [FromQuery(Name = "q")]
        [Required]
        [MinLength(2)]
        public string Q { get; init; } = string.Empty;
    }
}
