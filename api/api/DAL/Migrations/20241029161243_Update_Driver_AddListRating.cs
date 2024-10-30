using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class Update_Driver_AddListRating : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<string>(
                name: "AllRaiting",
                table: "Drivers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "AllRaiting",
                table: "Drivers");

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
    }
}
