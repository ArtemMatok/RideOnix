using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class NewImageCarForDriver : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<string>(
                name: "CarImage",
                table: "Drivers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<string>(
                name: "CarImage",
                table: "Drivers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

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
    }
}
