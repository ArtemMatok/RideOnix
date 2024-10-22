using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class DefaultProfileImageDriver : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0fdcda39-e0eb-4552-904f-ee12c964e016");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c4bff7bd-cb3b-4ef4-b467-1cab60f881d2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f1353673-5b4f-4c4c-927f-25e17300c8c1");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                    { "0fdcda39-e0eb-4552-904f-ee12c964e016", null, "Driver", "DRIVER" },
                    { "c4bff7bd-cb3b-4ef4-b467-1cab60f881d2", null, "Admin", "ADMIN" },
                    { "f1353673-5b4f-4c4c-927f-25e17300c8c1", null, "User", "USER" }
                });
        }
    }
}
