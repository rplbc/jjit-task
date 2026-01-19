using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace PokemonApi.Endpoints;

public static class TrainerEndpoints
{
    public static RouteGroupBuilder MapTrainerEndpoints(this RouteGroupBuilder group)
    {
        group
            .MapPost("/trainer", RegisterTrainer)
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
            request.Pokemon.Trim());

        return TypedResults.Created($"/api/trainer/{id}", response);
    }

    public sealed class TrainerRegistrationRequest
    {
        [Required]
        [MinLength(2)]
        [MaxLength(20)]
        public string Name { get; init; } = string.Empty;

        [Range(16, 99)]
        public int Age { get; init; }

        [Required]
        [MinLength(1)]
        public string Pokemon { get; init; } = string.Empty;
    }

    public sealed record TrainerRegistrationResponse(string Id, string Name, int Age, string Pokemon);
}
