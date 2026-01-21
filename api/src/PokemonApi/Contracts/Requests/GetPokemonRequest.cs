using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace PokemonApi.Contracts.Requests;

public sealed class GetPokemonRequest
{
    [FromQuery(Name = "id")]
    [Range(1, int.MaxValue)]
    public int Id { get; init; }
}
