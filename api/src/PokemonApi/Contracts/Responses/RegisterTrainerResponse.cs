namespace PokemonApi.Contracts.Responses;

public sealed record RegisterTrainerResponse(string Id, string Name, int Age, string Pokemon);
