using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class ChangeDBconection : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8d60af50-ab71-4eb4-bd2c-25860285510d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f8eb9e54-5e31-4b0c-a78b-7e9e4f8c8ca6");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0d4773d3-2ee0-4ca6-b2df-438ac875cca0", null, "Admin", "ADMIN" },
                    { "28cf0dbf-655c-45e7-92a4-9de48bfd3dcf", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0d4773d3-2ee0-4ca6-b2df-438ac875cca0");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "28cf0dbf-655c-45e7-92a4-9de48bfd3dcf");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8d60af50-ab71-4eb4-bd2c-25860285510d", null, "Admin", "ADMIN" },
                    { "f8eb9e54-5e31-4b0c-a78b-7e9e4f8c8ca6", null, "User", "USER" }
                });
        }
    }
}
