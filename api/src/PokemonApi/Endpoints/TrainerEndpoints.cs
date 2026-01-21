using Microsoft.AspNetCore.Mvc;
using PokemonApi.Contracts.Requests;
using PokemonApi.Contracts.Responses;

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
            .ProducesProblem(StatusCodes.Status400BadRequest);

        return group;
    }

    internal static IResult RegisterTrainer([FromBody] RegisterTrainerRequest request)
    {
        var id = Guid.NewGuid().ToString("N");
        var response = new RegisterTrainerResponse(
            id,
            request.Name.Trim(),
            request.Age,
            request.Pokemon.Trim()
        );

        return TypedResults.Created($"/api/trainer/{id}", response);
    }
}
