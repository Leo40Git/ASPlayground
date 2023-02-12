using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ASPlayground
{
    public partial class _Default : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void mvOperations_ActiveViewChanged(object sender, EventArgs e)
        {
            string script = "";

            var activeView = mvOperations.GetActiveView();
            if (activeView == Operations_One)
            {
                script = "Operations_One_init();";
            }
            else if (activeView == Operations_Two)
            {
                script = "Operations_Two_init();";
            }
            else if (activeView == Operations_Three)
            {
                script = "Operations_Three_init();";
            }

            ScriptManager.RegisterStartupScript(mvOperations, typeof(MultiView), "initView", script, true);
        }
    }
}