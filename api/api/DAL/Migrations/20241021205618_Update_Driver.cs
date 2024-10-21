using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class Update_Driver : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7e8f4142-245c-460b-a670-6fc5a56a1af2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a78dcdf6-df3c-4c81-a9ff-3e712056e129");

            migrationBuilder.RenameColumn(
                name: "ClassOfCar",
                table: "Drivers",
                newName: "TypeOfCar");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "55c55d18-6796-4f27-b974-a7e63c794e5c", null, "Admin", "ADMIN" },
                    { "9b561f7d-c178-4529-b317-05356659e83b", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "55c55d18-6796-4f27-b974-a7e63c794e5c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9b561f7d-c178-4529-b317-05356659e83b");

            migrationBuilder.RenameColumn(
                name: "TypeOfCar",
                table: "Drivers",
                newName: "ClassOfCar");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "7e8f4142-245c-460b-a670-6fc5a56a1af2", null, "Admin", "ADMIN" },
                    { "a78dcdf6-df3c-4c81-a9ff-3e712056e129", null, "User", "USER" }
                });
        }
    }
}
