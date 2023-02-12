<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="ASPlayground._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <asp:ScriptManagerProxy ID="Scripts" runat="server" />

    <asp:UpdatePanel ID="OperationsRoot" runat="server" UpdateMode="Conditional">
        <ContentTemplate>
            <asp:MultiView ID="mvOperations" runat="server" ActiveViewIndex="0"
                OnActiveViewChanged="mvOperations_ActiveViewChanged">
                <asp:View ID="Operations_Menu" runat="server">
                    <ul>
                        <li><asp:LinkButton runat="server"
                            CommandName="SwitchViewByID" CommandArgument="Operations_One" 
                            Text="One" /></li>
                        <li><asp:LinkButton runat="server"
                            CommandName="SwitchViewByID" CommandArgument="Operations_Two" 
                            Text="Two" /></li>
                        <li><asp:LinkButton runat="server"
                            CommandName="SwitchViewByID" CommandArgument="Operations_Three" 
                            Text="Three" /></li>
                    </ul>
                </asp:View>
                <asp:View ID="Operations_One" runat="server">
                    <p>One</p>
                    <asp:LinkButton runat="server"
                        CommandName="SwitchViewByID" CommandArgument="Operations_Menu"
                        Text="Back" />
                </asp:View>
                <asp:View ID="Operations_Two" runat="server">
                    <p>Two</p>
                    <asp:LinkButton runat="server"
                        CommandName="SwitchViewByID" CommandArgument="Operations_Menu"
                        Text="Back" />
                </asp:View>
                <asp:View ID="Operations_Three" runat="server">
                    <p>Three</p>
                    <asp:LinkButton runat="server"
                        CommandName="SwitchViewByID" CommandArgument="Operations_Menu"
                        Text="Back" />
                </asp:View>
            </asp:MultiView>
        </ContentTemplate>
    </asp:UpdatePanel>

    <script type="text/javascript">
        function Operations_One_init() {
            alert('hello from One');
        }

        function Operations_Two_init() {
            alert('hello from Two');
        }

        function Operations_Three_init() {
            alert('hello from Three');
        }
    </script>

</asp:Content>
