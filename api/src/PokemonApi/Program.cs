using PokemonApi.Endpoints;
using PokemonApi.Services;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<INtpService, NtpService>();
builder.Services.AddSingleton<IPokemonCatalog, PokemonCatalog>();
builder.Services.AddMemoryCache();
builder.Services.AddHttpClient<IPokemonDetailsService, PokemonDetailsService>(client =>
{
    client.BaseAddress = new Uri("https://pokeapi.co/api/v2/");
});
builder.Services.AddValidation();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.MapOpenApi();
    app.MapScalarApiReference();
}
else
{
    app.UseExceptionHandler(exceptionHandlerApp =>
        exceptionHandlerApp.Run(async context => await Results.Problem().ExecuteAsync(context))
    );
}

app.UseCors();

var apiGroup = app.MapGroup("/api");
apiGroup.WithTags("Ntp").MapTimeEndpoints();
apiGroup.WithTags("Pokemon").MapSearchEndpoints();
apiGroup.WithTags("Pokemon").MapPokemonEndpoints();

app.Run();
