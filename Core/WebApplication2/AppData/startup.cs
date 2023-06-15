using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Configuration;
using Models;
using System.Net;
//using WMS_WebAPI.Filters;

namespace WMS_WebAPI.AppData
{
    public class Startup
    {
        public IConfiguration configRoot
        {
            get;
        }
        public Startup(IConfiguration configuration)
        {
            configRoot = configuration;
        }
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.KnownProxies.Add(IPAddress.Parse("192.168.0.241"));
            });
            services.Configure<AppSettings>(configRoot.GetSection("AppSettings"));
            //services.AddScoped<Repositories.ISAPOperationRepo, SAPB1ServiceLayer.SAPOperations>();
            services.AddScoped<Repositories.IPgDbDapperHelperRepo, PostgresDBHelper.PostgresConnect>();
            services.AddScoped<Repositories.IDBHelperRepo, PostgresDBHelper.DbHelper>();
            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
        }
        public void Configure(WebApplication app, IWebHostEnvironment env)
        {
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });

            app.UseAuthorization();
            app.UseCors(x => x
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());

            // custom jwt auth middleware
            //app.UseMiddleware<JwtMiddleware>();
            app.MapControllers();
            app.Run();
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }
            /*
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthorization();
            app.MapRazorPages();
            */
        }
    }
}
