using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class Update_DB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7ccb422f-ff0a-43ec-a51e-25ae9b9248cc");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "83f51843-7867-4ae8-9a8b-cc52dfa45057");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bbc69158-f510-4ffa-bec1-1e8072860e90");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0e90b4cd-43fd-4109-895c-4cf8e5ef7d7e", null, "Admin", "ADMIN" },
                    { "79ff2cbf-0175-4d20-8a07-a3abf5a8b0af", null, "Driver", "DRIVER" },
                    { "b48a3e92-a411-493d-9b0c-9e2ca5b4c6a2", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0e90b4cd-43fd-4109-895c-4cf8e5ef7d7e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "79ff2cbf-0175-4d20-8a07-a3abf5a8b0af");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b48a3e92-a411-493d-9b0c-9e2ca5b4c6a2");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "7ccb422f-ff0a-43ec-a51e-25ae9b9248cc", null, "Admin", "ADMIN" },
                    { "83f51843-7867-4ae8-9a8b-cc52dfa45057", null, "Driver", "DRIVER" },
                    { "bbc69158-f510-4ffa-bec1-1e8072860e90", null, "User", "USER" }
                });
        }
    }
}
