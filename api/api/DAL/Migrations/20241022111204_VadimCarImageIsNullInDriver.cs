using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class VadimCarImageIsNullInDriver : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                    { "0fdcda39-e0eb-4552-904f-ee12c964e016", null, "Driver", "DRIVER" },
                    { "c4bff7bd-cb3b-4ef4-b467-1cab60f881d2", null, "Admin", "ADMIN" },
                    { "f1353673-5b4f-4c4c-927f-25e17300c8c1", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                    { "08d49747-9139-4c37-a216-45f8fcd6503c", null, "Admin", "ADMIN" },
                    { "edbd59e0-c323-4023-9298-7c6904e3c984", null, "Driver", "DRIVER" },
                    { "fbfd1d57-025f-4791-9574-7c4c1d2d6f3e", null, "User", "USER" }
                });
        }
    }
}
