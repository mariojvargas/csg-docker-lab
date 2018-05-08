using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using AutoMapper;
using Cardinal.DockerLabs.Infrastructure.Database;

namespace Cardinal.DockerLabs.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = Environment.GetEnvironmentVariable("CSG_DOCKER_LAB_CONN_STRING");

            services.AddEntityFrameworkSqlServer();
            
            services.AddDbContext<SmartHomeDbContext>(
                options => options.UseSqlServer(connectionString)
            );
            
            services.AddCors();

            services.AddMvc();

            services.AddAutoMapper();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(builder => builder.AllowAnyOrigin());
            
            app.UseMvc();

            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                SmartHomeDbContextInitializer.SeedDatabase(serviceScope.ServiceProvider.GetRequiredService<SmartHomeDbContext>());
            }
        }
    }
}
