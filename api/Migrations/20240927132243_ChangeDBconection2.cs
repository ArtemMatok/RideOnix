using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class ChangeDBconection2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                    { "8df38459-63c6-478b-84c6-d888a02c4017", null, "User", "USER" },
                    { "b9c48188-938c-4d63-a242-b9a3867cc50a", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8df38459-63c6-478b-84c6-d888a02c4017");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b9c48188-938c-4d63-a242-b9a3867cc50a");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0d4773d3-2ee0-4ca6-b2df-438ac875cca0", null, "Admin", "ADMIN" },
                    { "28cf0dbf-655c-45e7-92a4-9de48bfd3dcf", null, "User", "USER" }
                });
        }
    }
}
