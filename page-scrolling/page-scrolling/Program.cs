using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Windows.Forms;
using OpenQA.Selenium;
using OpenQA.Selenium.UI;
using OpenQA.Selenium.Chrome;
using System.Net.Http;
using Newtonsoft.Json.Linq;

namespace page_scrolling
{
    static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new Form1());

            ChromeOptions disablenotifs = new ChromeOptions();
            disablenotifs.AddArguments("--disable-notifications");

            ChromeDriver driver = new ChromeDriver();
            driver = new ChromeDriver(disablenotifs);

            //GET REQUEST
            /*
             *@param is a call to the  
             */

            var client = new HttpClient();
            var response = client.GetAsync("https://www.google.com").Result;

            var body = response.Content.ReadAsStringAsync().Result;
            var json = JObject.Parse(body);
            json["key"]

            
            driver.Navigate()
            int y_axis = 0;
            do
            {
                try
                {
                    if (param == true)
                    {
                        IJavaScriptExecutor jse = (IJavaScriptExecutor)driver;
                        jse.ExecuteScript("window.scrollBy(0," + y_axis + ")", "");
                        y_axis = y_axis + 500;
                        Thread.Sleep(10);
                    }
                }
                catch (NoSuchElementException)
                {
                    IJavaScriptExecutor jse = (IJavaScriptExecutor)driver;
                    jse.ExecuteScript("window.scrollBy(0," + y_axis + ")", "");
                    Thread.Sleep(10);
                }
            } while ();
        }
    }
}