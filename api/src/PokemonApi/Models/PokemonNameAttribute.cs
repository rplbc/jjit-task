using System.ComponentModel.DataAnnotations;
using PokemonApi.Services;

namespace PokemonApi.Models;

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Parameter)]
public sealed class PokemonNameAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is not string name || string.IsNullOrWhiteSpace(name))
        {
            return ValidationResult.Success;
        }

        var searchService = validationContext.GetService(typeof(IPokemonSearchService)) as IPokemonSearchService;
        if (searchService is null)
        {
            return new ValidationResult("Pokemon validation service is not available.");
        }

        return searchService.GetByName(name.Trim()) is null
            ? new ValidationResult($"Pokemon '{name.Trim()}' does not exist.")
            : ValidationResult.Success;
    }
}
