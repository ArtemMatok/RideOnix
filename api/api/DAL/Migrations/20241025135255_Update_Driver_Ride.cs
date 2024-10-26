using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class Update_Driver_Ride : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "16d510a6-aec2-461d-b139-91082d76790c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "89275621-1bcf-487d-a08e-986082e2efef");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c8c6a6ad-6753-4a90-9da2-1761452a2903");

            migrationBuilder.AddColumn<string>(
                name: "RideStatus",
                table: "Rides",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "IsAvailable",
                table: "Drivers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5e3da351-9c03-41f1-9b49-b8281354f2fe", null, "Admin", "ADMIN" },
                    { "752da463-cb4a-4b85-893f-9041750c4705", null, "Driver", "DRIVER" },
                    { "80fa0bb7-fbe9-4fd3-88b9-f392e521f165", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5e3da351-9c03-41f1-9b49-b8281354f2fe");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "752da463-cb4a-4b85-893f-9041750c4705");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "80fa0bb7-fbe9-4fd3-88b9-f392e521f165");

            migrationBuilder.DropColumn(
                name: "RideStatus",
                table: "Rides");

            migrationBuilder.DropColumn(
                name: "IsAvailable",
                table: "Drivers");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "16d510a6-aec2-461d-b139-91082d76790c", null, "Driver", "DRIVER" },
                    { "89275621-1bcf-487d-a08e-986082e2efef", null, "Admin", "ADMIN" },
                    { "c8c6a6ad-6753-4a90-9da2-1761452a2903", null, "User", "USER" }
                });
        }
    }
}
