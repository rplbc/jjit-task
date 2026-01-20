using Microsoft.AspNetCore.Mvc;
using PokemonApi.Models;

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
            .Produces(StatusCodes.Status201Created, typeof(TrainerRegistrationResponse))
            .ProducesProblem(StatusCodes.Status400BadRequest);

        return group;
    }

    internal static IResult RegisterTrainer([FromBody] TrainerRegistrationRequest request)
    {
        var id = Guid.NewGuid().ToString("N");
        var response = new TrainerRegistrationResponse(
            id,
            request.Name.Trim(),
            request.Age,
            request.Pokemon.Trim()
        );

        return TypedResults.Created($"/api/trainer/{id}", response);
    }
}
