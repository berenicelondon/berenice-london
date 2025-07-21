# Go Live on www.berenicelondon.com

Follow these steps to update your custom domain with the new design.

## Step 1: Deploy the New Version to Vercel

You must deploy the latest package first.

1.  **Download Package**: Find `berenice-london-production.tar.gz` in the file explorer and download it.
2.  **Go to Vercel**: Open your `berenice-london` project dashboard on Vercel.
3.  **Upload**: Drag and drop the downloaded `.tar.gz` file to deploy it.

This will create a new production deployment with the latest design.

## Step 2: Assign Your Custom Domain

1.  **Open Domain Settings**: In your Vercel project, go to **Settings -> Domains**.
2.  **Check Assignment**: Verify that `www.berenicelondon.com` and `berenicelondon.com` are assigned to the latest deployment. Vercel usually does this automatically.
3.  **Edit if Necessary**: If the domain is pointing to an old version, click **Edit** and assign it to the latest production deployment.

![Vercel Domains](https://vercel.com/docs/images/domains/domains-view.png)

## Step 3: Verify DNS (If not already configured)

If your domain is new to Vercel, you'll see a section for **DNS Configuration**.

*   Vercel will give you records (like an A record or CNAME) to add at your domain registrar (e.g., GoDaddy, Namecheap, etc.).
*   Follow the instructions to point your domain to Vercel's servers.

## Step 4: Go Live!

Once the deployment is complete and the domain is assigned, you should see the new design live at **https://www.berenicelondon.com**.

Propagation can sometimes take a few minutes.
