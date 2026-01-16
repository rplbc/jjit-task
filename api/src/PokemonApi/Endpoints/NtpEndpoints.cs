using Microsoft.AspNetCore.Mvc;
using PokemonApi.Services;

namespace PokemonApi.Endpoints;

public static class NtpEndpoints
{
    public static RouteGroupBuilder MapTimeEndpoints(this RouteGroupBuilder group)
    {
        group
            .MapGet("/time", GetTimeAsync)
            .WithName("GetTime")
            .WithSummary("Get network time")
            .Produces(StatusCodes.Status200OK, typeof(TimeResponse))
            .ProducesProblem(StatusCodes.Status500InternalServerError);

        return group;
    }

    public record TimeResponse(DateTimeOffset Time);

    internal static async Task<IResult> GetTimeAsync([FromServices] INtpService ntpService)
    {
        var time = await ntpService.GetNetworkTimeAsync();
        return TypedResults.Ok(new TimeResponse(time));
    }
}
