using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using KasKamSkolingas.Server.Models;

namespace KasKamSkolingas.Server.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Debt> Debts { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<ApplicationUserGroup> ApplicationUserGroups { get; set; }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);

            builder.Entity<ApplicationUserGroup>()
                .HasKey(t => new {t.ApplicationUserId, t.GroupId});

            builder.Entity<ApplicationUserGroup>()
                .HasOne(g => g.Group)
                .WithMany(ag => ag.ApplicationUserGroups)
                .HasForeignKey(g => g.GroupId);

            builder.Entity<ApplicationUserGroup>()
                .HasOne(a => a.ApplicationUser)
                .WithMany(ag => ag.ApplicationUserGroups)
                .HasForeignKey(a => a.ApplicationUserId);

        }
    }
}
