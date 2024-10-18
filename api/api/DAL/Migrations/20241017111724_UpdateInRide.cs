using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateInRide : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bc0af062-434c-46e7-8b7c-045edeb3b6b4");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d2d827f6-4939-4655-ac80-2b021a8694ae");

            migrationBuilder.AlterColumn<double>(
                name: "RideTime",
                table: "Rides",
                type: "float",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "186cbf1b-8960-4f4a-9774-9ad71c73c81a", null, "User", "USER" },
                    { "64a5699d-d0ab-469d-86c7-70b1ed43bf7e", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "186cbf1b-8960-4f4a-9774-9ad71c73c81a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "64a5699d-d0ab-469d-86c7-70b1ed43bf7e");

            migrationBuilder.AlterColumn<int>(
                name: "RideTime",
                table: "Rides",
                type: "int",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "bc0af062-434c-46e7-8b7c-045edeb3b6b4", null, "Admin", "ADMIN" },
                    { "d2d827f6-4939-4655-ac80-2b021a8694ae", null, "User", "USER" }
                });
        }
    }
}
