using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class Update_Ride_Add_RideRaiting : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3736dd48-fed5-4065-bfd1-d070cf812b05");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "899da188-170c-4322-a45a-f2016dbbd6bd");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e9df540a-638b-452c-88c3-3c6e20024cc2");

            migrationBuilder.AddColumn<int>(
                name: "RideRaiting",
                table: "Rides",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "627f9b73-bf80-4e9c-abe2-8f8ad20b2da8", null, "Driver", "DRIVER" },
                    { "9733ac5d-ce03-4942-ba2f-b165804b2291", null, "Admin", "ADMIN" },
                    { "ffc1897f-992c-4e43-90f2-d76fb4e84b64", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "627f9b73-bf80-4e9c-abe2-8f8ad20b2da8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9733ac5d-ce03-4942-ba2f-b165804b2291");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ffc1897f-992c-4e43-90f2-d76fb4e84b64");

            migrationBuilder.DropColumn(
                name: "RideRaiting",
                table: "Rides");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3736dd48-fed5-4065-bfd1-d070cf812b05", null, "Admin", "ADMIN" },
                    { "899da188-170c-4322-a45a-f2016dbbd6bd", null, "User", "USER" },
                    { "e9df540a-638b-452c-88c3-3c6e20024cc2", null, "Driver", "DRIVER" }
                });
        }
    }
}
