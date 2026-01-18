using Microsoft.AspNetCore.Mvc;
using PokemonApi.Services;
using System.ComponentModel.DataAnnotations;

namespace PokemonApi.Endpoints;

public static class PokemonEndpoints
{
    public static RouteGroupBuilder MapPokemonEndpoints(this RouteGroupBuilder group)
    {
        group
            .MapGet("/pokemon", GetPokemonAsync)
            .WithName("GetPokemon")
            .WithSummary("Get Pokemon details by id")
            .Produces(StatusCodes.Status200OK, typeof(PokemonDetailsDto))
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound);

        return group;
    }

    internal static async Task<IResult> GetPokemonAsync(
        [FromServices] IPokemonDetailsService pokemonService,
        [AsParameters] PokemonRequest request,
        CancellationToken cancellationToken)
    {
        var pokemon = await pokemonService.GetPokemonAsync(request.Id, cancellationToken);
        return pokemon is null ? TypedResults.NotFound() : TypedResults.Ok(pokemon);
    }

    public sealed class PokemonRequest
    {
        [FromQuery(Name = "id")]
        [Range(1, int.MaxValue)]
        public int Id { get; init; }
    }
}
