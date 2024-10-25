using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class Update_Driver_AddEmail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0e90b4cd-43fd-4109-895c-4cf8e5ef7d7e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "79ff2cbf-0175-4d20-8a07-a3abf5a8b0af");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b48a3e92-a411-493d-9b0c-9e2ca5b4c6a2");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Drivers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Drivers");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0e90b4cd-43fd-4109-895c-4cf8e5ef7d7e", null, "Admin", "ADMIN" },
                    { "79ff2cbf-0175-4d20-8a07-a3abf5a8b0af", null, "Driver", "DRIVER" },
                    { "b48a3e92-a411-493d-9b0c-9e2ca5b4c6a2", null, "User", "USER" }
                });
        }
    }
}
