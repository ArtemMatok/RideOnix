using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class Update_Driver_FullName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "55c55d18-6796-4f27-b974-a7e63c794e5c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9b561f7d-c178-4529-b317-05356659e83b");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Drivers");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Drivers",
                newName: "FullName");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a62e8342-493f-4ffd-abe9-47cc54f654ee", null, "Driver", "DRIVER" },
                    { "b4e22df2-59c1-4a3c-a55a-84594b33fbbb", null, "User", "USER" },
                    { "f59c664d-02fb-43d8-a48d-055cffa5bff7", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a62e8342-493f-4ffd-abe9-47cc54f654ee");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b4e22df2-59c1-4a3c-a55a-84594b33fbbb");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f59c664d-02fb-43d8-a48d-055cffa5bff7");

            migrationBuilder.RenameColumn(
                name: "FullName",
                table: "Drivers",
                newName: "LastName");

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Drivers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "55c55d18-6796-4f27-b974-a7e63c794e5c", null, "Admin", "ADMIN" },
                    { "9b561f7d-c178-4529-b317-05356659e83b", null, "User", "USER" }
                });
        }
    }
}
