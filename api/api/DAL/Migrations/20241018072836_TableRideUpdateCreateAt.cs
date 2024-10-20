using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class TableRideUpdateCreateAt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "186cbf1b-8960-4f4a-9774-9ad71c73c81a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "64a5699d-d0ab-469d-86c7-70b1ed43bf7e");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Rides",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "9c64c3d6-9a2d-4082-a2bb-30a5a852996b", null, "User", "USER" },
                    { "feb7fb3f-6c88-4073-8f1b-a3ae73dafbb5", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9c64c3d6-9a2d-4082-a2bb-30a5a852996b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "feb7fb3f-6c88-4073-8f1b-a3ae73dafbb5");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedAt",
                table: "Rides",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "186cbf1b-8960-4f4a-9774-9ad71c73c81a", null, "User", "USER" },
                    { "64a5699d-d0ab-469d-86c7-70b1ed43bf7e", null, "Admin", "ADMIN" }
                });
        }
    }
}
