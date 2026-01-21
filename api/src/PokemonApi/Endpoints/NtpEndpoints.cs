using Microsoft.AspNetCore.Mvc;
using PokemonApi.Contracts.Responses;
using PokemonApi.Services;

namespace PokemonApi.Endpoints;

public static class NtpEndpoints
{
    public static RouteGroupBuilder MapTimeEndpoints(this RouteGroupBuilder group)
    {
        group
            .MapGet("/time", GetTimeAsync)
            .WithTags("Ntp")
            .WithName("GetTime")
            .WithSummary("Get network time")
            .Produces(StatusCodes.Status200OK, typeof(GetTimeResponse));

        return group;
    }

    internal static async Task<IResult> GetTimeAsync([FromServices] INtpService ntpService)
    {
        var time = await ntpService.GetNetworkTimeAsync();
        return TypedResults.Ok(new GetTimeResponse(time));
    }
}
