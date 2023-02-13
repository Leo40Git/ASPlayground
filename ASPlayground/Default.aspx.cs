using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ASPlayground
{
    public partial class _Default : Page
    {
        protected void Page_Init(object sender, EventArgs e)
        {
            ScriptManager.RegisterStartupScript(lbTest, typeof(_Default), "init", "lbTest_init();", true);
        }

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void lbTest_SelectedIndexChanged(object sender, EventArgs e)
        {
            var sb = new StringBuilder();
            foreach (ListItem li in lbTest.Items)
            {
                if (li.Selected)
                {
                    sb.Append($"{li.Text} ({li.Value}), ");
                }
            }

            if (sb.Length >= 2)
            {
                sb.Length -= 2;
            }

            if (sb.Length == 0)
            {
                lblSelected.Text = "No items selected.";
            }
            else
            {
                lblSelected.Text = "Selected: " + sb;
            }
        }
    }
}