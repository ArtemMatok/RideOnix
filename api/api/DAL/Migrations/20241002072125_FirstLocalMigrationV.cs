using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class FirstLocalMigrationV : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "409cc77d-6717-42d5-b30d-9f802c45fc91");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6e112e92-3510-49a4-8578-0b9884050714");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6097077e-fcc2-4826-b97a-55b7fbc57e66", null, "Admin", "ADMIN" },
                    { "9be3561e-18d0-4e22-94f8-8ded1695b6d7", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6097077e-fcc2-4826-b97a-55b7fbc57e66");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9be3561e-18d0-4e22-94f8-8ded1695b6d7");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "409cc77d-6717-42d5-b30d-9f802c45fc91", null, "User", "USER" },
                    { "6e112e92-3510-49a4-8578-0b9884050714", null, "Admin", "ADMIN" }
                });
        }
    }
}
