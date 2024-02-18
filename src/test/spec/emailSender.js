const { remote } = require('webdriverio');

const capabilities = {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'Q4OJXSDI99R4T8IZ',
    'appium:appPackage': 'com.google.android.gm',
    'appium:appActivity': 'com.google.android.gm.ui.MailActivityGmail',
};

const wdOpts = {
    hostname: process.env.APPIUM_HOST || 'localhost',
    port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
    logLevel: 'info',
    capabilities,
};

async function runTest() {
    const driver = await remote(wdOpts);
    try {

        //cliking on got button and adding email address
        await driver.$('//android.widget.TextView[@text="GOT IT"]').click();
        await driver.pause(1000);
        await driver.$('//android.widget.TextView[@text="Add another email address"]').click();
        await driver.pause(1000);
        // await driver.$('//android.widget.TextView[@text="TAKE ME TO GMAIL"]').click();
        // await driver.pause(10000);

        //Search email information
        const sender = 'neoshore@gmail.com';
        const receiver = 'neoshore@gmail.com';
        const subject = 'Neoshore Test - LE TEST';

        /**
         * 1. Choose google email address
         * 2. type email addres
         * 3. enter password
         * 4. signing in
         * 5. click on search and type email info to search for soecific email
         * 6. click on email.
         * 7. type an email in the body area and then on reply
         */
        await driver.$('//android.widget.TextView[@text="Google"]').click();
        await driver.pause(10000);
        await driver.$('//android.widget.EditText').setValue('neoshoretest@gmail.com');
        await driver.pause(10000);
        await driver.$('//android.widget.Button[@text="Next"]').click();
        await driver.$('//android.widget.EditText').setValue('NeoshoreTEST');
        await driver.$('//android.widget.Button[@text="Next"]').click();

        // await driver.$('//android.widget.EditText').setValue('my_number');
        // await driver.$('//android.widget.Button[@text="Next"]').click();

        await driver.pause(20000);
        await driver.$('//android.widget.Button[@text="I agree"]').click();
        await driver.$('//android.widget.EditText').setValue(`from:${sender} to:${receiver} subject:${subject}`);
        await driver.$('//android.view.ViewGroup[@resource-id="com.google.android.gm:id/viewified_conversation_item_view"]').click()
        await driver.$('//android.widget.LinearLayout[@resource-id="com.google.android.gm:id/reply_button"]').click();
        await driver.$('//android.widget.LinearLayout[@resource-id="com.google.android.gm:id/wc_body_layout"]/android.webkit.WebView/android.webkit.WebView/android.widget.EditText').setValue('Je repondss automatiquement a ce mail');
        (await driver.$('//android.widget.Button[@content-desc="Send"]')).click();

    } finally {
        await driver.pause(1000);
        await driver.deleteSession();
    }
}

runTest().catch(console.error);