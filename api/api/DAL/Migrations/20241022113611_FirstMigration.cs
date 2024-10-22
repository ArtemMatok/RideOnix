using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class FirstMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2a1d16a6-6bab-4ff3-b63c-b110838645c3");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "55f28ae4-7071-4d8f-bb07-8d8cb646ae7f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b3333ca1-6612-47f0-8219-c54e672bf3fa");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5546132f-8578-467e-b3de-fc348b2e5101", null, "Driver", "DRIVER" },
                    { "ce2bcbd8-5a01-48c7-9ec6-fa0bdb714012", null, "Admin", "ADMIN" },
                    { "f34e7e6b-3dba-4af5-8e6f-fcadc9085b0c", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5546132f-8578-467e-b3de-fc348b2e5101");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ce2bcbd8-5a01-48c7-9ec6-fa0bdb714012");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f34e7e6b-3dba-4af5-8e6f-fcadc9085b0c");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2a1d16a6-6bab-4ff3-b63c-b110838645c3", null, "Admin", "ADMIN" },
                    { "55f28ae4-7071-4d8f-bb07-8d8cb646ae7f", null, "User", "USER" },
                    { "b3333ca1-6612-47f0-8219-c54e672bf3fa", null, "Driver", "DRIVER" }
                });
        }
    }
}
