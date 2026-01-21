using Microsoft.AspNetCore.Mvc;
using PokemonApi.Contracts.Requests;
using PokemonApi.Contracts.Responses;
using PokemonApi.Services;

namespace PokemonApi.Endpoints;

public static class PokemonEndpoints
{
    public static RouteGroupBuilder MapPokemonEndpoints(this RouteGroupBuilder group)
    {
        group
            .MapGet("/pokemon", GetPokemonAsync)
            .WithTags("Pokemon")
            .WithName("GetPokemon")
            .WithSummary("Get Pokemon details by id")
            .Produces(StatusCodes.Status200OK, typeof(PokemonDetailsResponse))
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound);

        return group;
    }

    internal static async Task<IResult> GetPokemonAsync(
        [FromServices] IPokemonDetailsService pokemonService,
        [AsParameters] GetPokemonRequest request
    )
    {
        var pokemon = await pokemonService.GetPokemonAsync(request.Id);
        return pokemon is null ? TypedResults.NotFound() : TypedResults.Ok(pokemon);
    }
}
