using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace PokemonApi.Models;

public sealed class PokemonRequest
{
    [FromQuery(Name = "id")]
    [Range(1, int.MaxValue)]
    public int Id { get; init; }
}
