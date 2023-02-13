<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="ASPlayground._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <asp:ScriptManagerProxy runat="server">
        <Scripts>
            <asp:ScriptReference Path="Scripts/Custom/ListBox2TreeView.js" />
        </Scripts>
    </asp:ScriptManagerProxy>

    <asp:UpdatePanel runat="server" UpdateMode="Always">
        <ContentTemplate>
            <asp:ListBox ID="lbTest" runat="server"
                SelectionMode="Multiple" AutoPostBack="True"
                OnSelectedIndexChanged="lbTest_SelectedIndexChanged">
                <asp:ListItem Text="One" Value="1" />
                <asp:ListItem Text="Two" Value="2" />
                <asp:ListItem Text="Three" Value="3" />
                <asp:ListItem Text="Four" Value="4" />
                <asp:ListItem Text="Five" Value="5" />
            </asp:ListBox>
            <br />
            <asp:Label ID="lblSelected" runat="server">...</asp:Label>
        </ContentTemplate>
    </asp:UpdatePanel>

    <script type="text/javascript">
        function lbTest_init() {
            ListBox2TreeView('<%= lbTest.ClientID %>');
        }
    </script>

</asp:Content>
