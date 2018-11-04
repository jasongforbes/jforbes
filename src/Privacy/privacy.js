import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import FullPage from '../FullPage';

const styles = theme => ({
  listItem: theme.typography.list,
});

const Privacy = ({ classes }) => (
  <FullPage>
    <div>
      <Typography variant="h3">Privacy Policy</Typography>
      <Typography variant="subtitle1">Effective date: October 22, 2018</Typography>
      <Typography variant="body1">
        Jason Forbes (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;) operates the{' '}
        <a href="https://jforbes.io">https://jforbes.io</a> website (the &quot;Service&quot;).
      </Typography>
      <Typography variant="body1">
        This page informs you of our policies regarding the collection, use, and disclosure of
        personal data when you use our Service and the choices you have associated with that data.
      </Typography>
      <Typography variant="body1">
        We use your data to provide and improve the Service. By using the Service, you agree to the
        collection and use of information in accordance with this policy. Unless otherwise defined
        in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our
        Terms and Conditions, accessible from <a href="https://jforbes.io">https://jforbes.io</a>.
      </Typography>
    </div>

    <Typography variant="h4">Information Collection And Use</Typography>

    <Typography variant="body1">
      We collect several different types of information for various purposes to provide and improve
      our Service to you.
    </Typography>

    <Typography variant="h5">Types of Data Collected</Typography>

    <Typography variant="h6">Personal Data</Typography>

    <Typography variant="body1">
      While using our Service, we may ask you to provide us with certain personally identifiable
      information that can be used to contact or identify you (&quot;Personal Data&quot;).
      Personally identifiable information may include, but is not limited to:
    </Typography>

    <ul>
      <li>
        <Typography className={classes.listItem}>Email address</Typography>
      </li>
      <li>
        <Typography className={classes.listItem}>First name and last name</Typography>
      </li>
      <li>
        <Typography className={classes.listItem}>Cookies and Usage Data</Typography>
      </li>
    </ul>

    <Typography variant="h6">Usage Data</Typography>
    <Typography variant="body1">
      We may also collect information how the Service is accessed and used (&quot;Usage Data&quot;).
      This Usage Data may include information such as your computer&apos;s Internet Protocol address
      (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the
      time and date of your visit, the time spent on those pages, unique device identifiers and
      other diagnostic data.
    </Typography>

    <Typography variant="h6">Tracking & Cookies Data</Typography>
    <Typography variant="body1">
      We use cookies and similar tracking technologies to track the activity on our Service and hold
      certain information.
    </Typography>
    <Typography variant="body1">
      Cookies are files with small amount of data which may include an anonymous unique identifier.
      Cookies are sent to your browser from a website and stored on your device. Tracking
      technologies also used are beacons, tags, and scripts to collect and track information and to
      improve and analyze our Service.
    </Typography>
    <Typography variant="body1">
      You can instruct your browser to refuse all cookies or to indicate when a cookie is being
      sent. However, if you do not accept cookies, you may not be able to use some portions of our
      Service.
    </Typography>
    <Typography variant="body1">Examples of Cookies we use:</Typography>
    <ul>
      <li>
        <Typography className={classes.listItem}>
          <strong>Session Cookies.</strong> We use Session Cookies to operate our Service.
        </Typography>
      </li>
      <li>
        <Typography className={classes.listItem}>
          <strong>Preference Cookies.</strong> We use Preference Cookies to remember your
          preferences and various settings.
        </Typography>
      </li>
      <li>
        <Typography className={classes.listItem}>
          <strong>Security Cookies.</strong> We use Security Cookies for security purposes.
        </Typography>
      </li>
    </ul>

    <Typography variant="h4">Use of Data</Typography>

    <Typography variant="body1">
      Jason Forbes uses the collected data for various purposes:
    </Typography>
    <ul>
      <li>
        <Typography className={classes.listItem}>To provide and maintain the Service</Typography>
      </li>
      <li>
        <Typography className={classes.listItem}>
          To notify you about changes to our Service
        </Typography>
      </li>
      <li>
        <Typography className={classes.listItem}>
          To allow you to participate in interactive features of our Service when you choose to do
          so
        </Typography>
      </li>
      <li>
        <Typography className={classes.listItem}>To provide customer care and support</Typography>
      </li>
      <li>
        <Typography className={classes.listItem}>
          To provide analysis or valuable information so that we can improve the Service
        </Typography>
      </li>
      <li>
        <Typography className={classes.listItem}>To monitor the usage of the Service</Typography>
      </li>
      <li>
        <Typography className={classes.listItem}>
          To detect, prevent and address technical issues
        </Typography>
      </li>
    </ul>

    <Typography variant="h4">Transfer Of Data</Typography>
    <Typography variant="body1">
      Your information, including Personal Data, may be transferred to — and maintained on —
      computers located outside of your state, province, country or other governmental jurisdiction
      where the data protection laws may differ than those from your jurisdiction.
    </Typography>
    <Typography variant="body1">
      If you are located outside Canada and choose to provide information to us, please note that we
      transfer the data, including Personal Data, to Canada and process it there.
    </Typography>
    <Typography variant="body1">
      Your consent to this Privacy Policy followed by your submission of such information represents
      your agreement to that transfer.
    </Typography>
    <Typography variant="body1">
      Jason Forbes will take all steps reasonably necessary to ensure that your data is treated
      securely and in accordance with this Privacy Policy and no transfer of your Personal Data will
      take place to an organization or a country unless there are adequate controls in place
      including the security of your data and other personal information.
    </Typography>

    <Typography variant="h4">Disclosure Of Data</Typography>

    <Typography variant="h5">Legal Requirements</Typography>
    <Typography variant="body1">
      Jason Forbes may disclose your Personal Data in the good faith belief that such action is
      necessary to:
    </Typography>
    <ul>
      <li>
        <Typography className={classes.listItem}>To comply with a legal obligation</Typography>
      </li>
      <li>
        <Typography className={classes.listItem}>
          To protect and defend the rights or property of Jason Forbes
        </Typography>
      </li>
      <li>
        <Typography className={classes.listItem}>
          To prevent or investigate possible wrongdoing in connection with the Service
        </Typography>
      </li>
      <li>
        <Typography className={classes.listItem}>
          To protect the personal safety of users of the Service or the public
        </Typography>
      </li>
      <li>
        <Typography className={classes.listItem}>To protect against legal liability</Typography>
      </li>
    </ul>

    <Typography variant="h4">Security Of Data</Typography>
    <Typography variant="body1">
      The security of your data is important to us, but remember that no method of transmission over
      the Internet, or method of electronic storage is 100% secure. While we strive to use
      commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute
      security.
    </Typography>

    <Typography variant="h4">Service Providers</Typography>
    <Typography variant="body1">
      We may employ third party companies and individuals to facilitate our Service (&quot;Service
      Providers&quot;), to provide the Service on our behalf, to perform Service-related services or
      to assist us in analyzing how our Service is used.
    </Typography>
    <Typography variant="body1">
      These third parties have access to your Personal Data only to perform these tasks on our
      behalf and are obligated not to disclose or use it for any other purpose.
    </Typography>

    <Typography variant="h5">Analytics</Typography>
    <Typography variant="body1">
      We may use third-party Service Providers to monitor and analyze the use of our Service.
    </Typography>
    <ul>
      <li>
        <Typography className={classes.listItem}>
          <strong>Google Analytics</strong>
        </Typography>
        <Typography variant="body1">
          Google Analytics is a web analytics service offered by Google that tracks and reports
          website traffic. Google uses the data collected to track and monitor the use of our
          Service. This data is shared with other Google services. Google may use the collected data
          to contextualize and personalize the ads of its own advertising network.
        </Typography>
        <Typography variant="body1">
          You can opt-out of having made your activity on the Service available to Google Analytics
          by installing the Google Analytics opt-out browser add-on. The add-on prevents the Google
          Analytics JavaScript (ga.js, analytics.js, and dc.js) from sharing information with Google
          Analytics about visits activity.
        </Typography>
        <Typography variant="body1">
          For more information on the privacy practices of Google, please visit the Google Privacy &
          Terms web page:{' '}
          <a href="https://policies.google.com/privacy">https://policies.google.com/privacy</a>
        </Typography>
      </li>
    </ul>

    <Typography variant="h4">Links To Other Sites</Typography>
    <Typography variant="body1">
      Our Service may contain links to other sites that are not operated by us. If you click on a
      third party link, you will be directed to that third party&apos;s site. We strongly advise you
      to review the Privacy Policy of every site you visit.
    </Typography>
    <Typography variant="body1">
      We have no control over and assume no responsibility for the content, privacy policies or
      practices of any third party sites or services.
    </Typography>

    <Typography variant="h4">Children&apos;s Privacy</Typography>
    <Typography variant="body1">
      Our Service does not address anyone under the age of 18 (&quot;Children&quot;).
    </Typography>
    <Typography variant="body1">
      We do not knowingly collect personally identifiable information from anyone under the age of
      18. If you are a parent or guardian and you are aware that your Children has provided us with
      Personal Data, please contact us. If we become aware that we have collected Personal Data from
      children without verification of parental consent, we take steps to remove that information
      from our servers.
    </Typography>

    <Typography variant="h4">Changes To This Privacy Policy</Typography>
    <Typography variant="body1">
      We may update our Privacy Policy from time to time. We will notify you of any changes by
      posting the new Privacy Policy on this page.
    </Typography>
    <Typography variant="body1">
      We will let you know via email and/or a prominent notice on our Service, prior to the change
      becoming effective and update the &quot;effective date&quot; at the top of this Privacy
      Policy.
    </Typography>
    <Typography variant="body1">
      You are advised to review this Privacy Policy periodically for any changes. Changes to this
      Privacy Policy are effective when they are posted on this page.
    </Typography>

    <Typography variant="h4">Contact Us</Typography>
    <Typography variant="body1">
      If you have any questions about this Privacy Policy, please contact us:
    </Typography>
    <ul>
      <li>
        <Typography className={classes.listItem}>
          By email: <a href="mailto:privacy@jforbes.io">privacy@jforbes.io</a>
        </Typography>
      </li>
    </ul>
  </FullPage>
);

Privacy.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Privacy);
