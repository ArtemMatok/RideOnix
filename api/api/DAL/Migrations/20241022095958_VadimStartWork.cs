using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class VadimStartWork : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a62e8342-493f-4ffd-abe9-47cc54f654ee");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b4e22df2-59c1-4a3c-a55a-84594b33fbbb");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f59c664d-02fb-43d8-a48d-055cffa5bff7");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "08d49747-9139-4c37-a216-45f8fcd6503c", null, "Admin", "ADMIN" },
                    { "edbd59e0-c323-4023-9298-7c6904e3c984", null, "Driver", "DRIVER" },
                    { "fbfd1d57-025f-4791-9574-7c4c1d2d6f3e", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "08d49747-9139-4c37-a216-45f8fcd6503c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "edbd59e0-c323-4023-9298-7c6904e3c984");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fbfd1d57-025f-4791-9574-7c4c1d2d6f3e");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a62e8342-493f-4ffd-abe9-47cc54f654ee", null, "Driver", "DRIVER" },
                    { "b4e22df2-59c1-4a3c-a55a-84594b33fbbb", null, "User", "USER" },
                    { "f59c664d-02fb-43d8-a48d-055cffa5bff7", null, "Admin", "ADMIN" }
                });
        }
    }
}
