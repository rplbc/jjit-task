using Microsoft.AspNetCore.Mvc;
using PokemonApi.Contracts.Requests;
using PokemonApi.Contracts.Responses;
using PokemonApi.Services;

namespace PokemonApi.Endpoints;

public static class TrainerEndpoints
{
    public static RouteGroupBuilder MapTrainerEndpoints(this RouteGroupBuilder group)
    {
        group
            .MapPost("/trainer", RegisterTrainer)
            .WithTags("Trainer")
            .WithName("RegisterTrainer")
            .WithSummary("Register a trainer")
            .Produces(StatusCodes.Status201Created, typeof(RegisterTrainerResponse))
            .ProducesValidationProblem();

        return group;
    }

    internal static IResult RegisterTrainer(
        [FromBody] RegisterTrainerRequest request,
        [FromServices] IPokemonSearchService pokemonSearchService
    )
    {
        if (!pokemonSearchService.ExistsByName(request.Pokemon))
            return TypedResults.ValidationProblem(
                new Dictionary<string, string[]>
                {
                    { "Pokemon", new[] { $"Pokemon '{request.Pokemon}' does not exist." } },
                }
            );

        var id = Guid.NewGuid().ToString("N");
        var response = new RegisterTrainerResponse(id, request.Name, request.Age, request.Pokemon);

        return TypedResults.Created($"/api/trainer/{id}", response);
    }
}
