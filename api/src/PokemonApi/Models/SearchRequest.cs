using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace PokemonApi.Models;

public sealed class SearchRequest
{
    [FromQuery(Name = "q")]
    [Required]
    [MinLength(2)]
    public string Q { get; init; } = string.Empty;
}
