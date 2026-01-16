using PokemonApi.Endpoints;
using PokemonApi.Services;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<INtpService, NtpService>();
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

app.MapGroup("/api").WithTags("Ntp").MapTimeEndpoints();

app.Run();
