const html = `
<!DOCTYPE html>
<html dir="ltr" lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!-- Tell the browser to be responsive to screen width -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="">
  <meta name="author" content="">
  <!-- Favicon icon -->
  <link rel="icon" type="image/png" sizes="16x16" href="https://pandaportal.co/assets/images/favicon.png">

  <title> The Academy | Panda Portal </title>

    <!-- Custom CSS -->
    <link href="https://pandaportal.co/dist/css/style.css" rel="stylesheet">



  <link href="https://fonts.googleapis.com/css?family=Work+Sans:300,400,700&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="https://pandaportal.co/assets/libs/bootstrap/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://pandaportal.co/css/owl.carousel.min.css">
  <link rel="stylesheet" href="https://pandaportal.co/css/owl.theme.default.min.css">

  <link rel="stylesheet" href="https://pandaportal.co/css/panda.css">

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
  <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
  <![endif]-->

  <link rel="stylesheet" href="https://pandaportal.co/css/styles.css">
<style>
  #panda-iframe-video-home{
    position: absolute;
    width: 100%;
    /* padding-top: 56.25%; */
    top: 50%;
    left: 6%;
    /* right: 3%;
    bottom: 49%; */
    /* background-color: red; */
    z-index: 10;
    transform: translateY(-44.5%);
  }

  @media  only screen and (max-width: 768px) {
    #panda-iframe-video-home{
      left: 6.5%;
    }
}

}
</style>
    <style>

.panda-link-active,
.nav-link{
  position: relative;

}

.nav-link:after,
.nav-link:before {
  transition: all .5s;
  content: "";
  display: inline-block;
  width: 0%;
  height: 4px;
  position: absolute;
  bottom: 0px;
  left: 50%;
  background-color: transparent;
  transform: translateX(-50%);
}


.nav-link:hover:after {
  width: 3rem;
  background-color: black;
}
.panda-link-active:before{
  content: "";
  display: inline-block;
  width: 3rem;
  height: 4px;
  position: absolute;
  bottom: 0px;
  left: 50%;
  background-color: black;
  transform: translateX(-50%);
}

.panda-movil-menu .panda-link-active::before{
  width: 4px;
  height: 3rem;
  top: 50%;
  left: 0px;
  transform: translateY(-50%);
}
    </style>
</head>

<body>
<!-- ============================================================== -->
<!-- Preloader - style you can find in spinners.css -->
<!-- ============================================================== -->






<!-- ============================================================== -->
<!-- Main wrapper - style you can find in pages.scss -->
<!-- ============================================================== -->
<div id="main-wrapper"  class="fix-header boxed-layout">


    <!-- ============================================================== -->
    <!-- Topbar header - style you can find in pages.scss -->
    <!-- ============================================================== -->
<header class="topbar position-relative">
  <nav class="nav align-items-center panda-low-gray-text px-3 px-md-5 panda-nav-bar">
  <a class="panda-nav-logo position-relative" href="https://pandaportal.co">
      <img class="img-fluid panda-position-center" src="https://pandaportal.co/assets/images/logo-icon.png" alt="logo">
    </a>
    <div class="d-none d-md-flex ml-auto  align-items-center ">
    <a class="nav-link ml-auto text-uppercase " href="https://pandaportal.co/panda_ecosystem">The Ecosystem</a>

    <div class="dropdown">
      <a class="nav-link dropdown-toggle   " href="#"  data-toggle="dropdown">SOLUTIONS</a>
      <ul class="dropdown-menu" >
        <li><a class="" href="https://pandaportal.co/solutions/schools">For Schools</a></li>
        <li><a class="" href="https://pandaportal.co/solutions/agents">For Agents</a></li>
        <li><a class="" href="https://pandaportal.co/pricing">PRICING</a></li>
      </ul>
    </div>

    <a class="nav-link " href="https://pandaportal.co/about">ABOUT</a>

  <a class="nav-link " href="https://pandaportal.co/contact">CONTACT US</a>

    <div>
              <a class="panda-btn panda-btn-boder mr-3" href="https://pandaportal.co/login">LOGIN</a>
        <button type="button" class="panda-btn btn-dark" href="" data-toggle="modal" data-target="#emailModal" id="drop-user-background">START NOW FOR FREE!</button type="button">
          </div>
    </div>
          <!-- Button trigger modal -->
    <button type="button" class="panda-btn-menu ml-auto d-inline-block d-md-none" data-toggle="modal" data-target="#exampleModal">

    </button>
  </nav>

<!-- Modal -->
<div class="modal fade panda-movil-menu" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog m-0" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <a class="panda-nav-logo" href="index.php">
          <img class="img-fluid" src="https://pandaportal.co/assets/images/logo-icon.png" alt="">
        </a>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <a class="panda-input bg-white d-block mb-3 text-uppercase " href="https://pandaportal.co/panda_ecosystem">The Ecosystem</a>


      <a class="panda-input bg-white d-block mb-3   " data-toggle="collapse" href="#collapseSolutions" role="button" aria-expanded="false" aria-controls="collapseSolutions">SOLUTIONS
      <span class="d-inline-block float-right">
        <i class="fas fa-arrow-down"></i><i class="fas fa-arrow-up d-none"></i>
      </span></a>
      <div class="collapse" id="collapseSolutions">
        <div class="">
          <a class="panda-input bg-white d-block mb-3 text-uppercase pl-5" href="https://pandaportal.co/solutions/schools">For Schools</a>
          <a class="panda-input bg-white d-block mb-3 text-uppercase pl-5" href="https://pandaportal.co/solutions/agents">For Agents</a>
          <a class="panda-input bg-white d-block mb-3 text-uppercase pl-5" href="https://pandaportal.co/pricing">PRICING</a>
        </div>
      </div>

    <a class="panda-input bg-white d-block mb-3 " href="https://pandaportal.co/about">ABOUT</a>

    <a class="panda-input bg-white d-block mb-3 " href="https://pandaportal.co/contact">CONTACT US</a>

    <div>
              <a class="panda-btn panda-btn-boder mr-3 mb-3 w-100" href="https://pandaportal.co/login">LOGIN</a>
        <button type="button" class="panda-btn btn-dark mb-3 w-100" href="" data-toggle="modal" data-target="#emailModal" id="drop-user-background">START NOW FOR FREE!</button type="button">
          </div>
      </div>
      <div class="modal-footer">

      </div>
    </div>
  </div>
</div>


<!-- Modal email -->

<div class="modal fade panda-modal" id="emailModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content h-auto shadow">
      <div class="modal-header">
        <h2 class="panda-text font-weight-bold text-white">Register</h2>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span class="text-white" aria-hidden="true">&times;</span>
          </button>
      </div>
      <div class="modal-body">
        <form class="row" action="https://pandaportal.co/register" method="post">
          <input type="hidden" name="_token" value="XUdERW4H9MPz0v1NPRoaUxyXGSNJRk6o2cHMQMTf">          <div class="col-12 ">
            <label for="">Email</label>
            <input type="email" name="email" class="panda-input border-dark border-bottom w-100 mb-3" placeholder="Write your E-mail" id="email">
          </div>
          <div class="col-12 ">
            <button type="submit" class="panda-btn btn-dark w-100">GET STARTED FOR FREE</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</header>

<!-- ============================================================== -->
    <!-- End Topbar header -->
    <!-- ============================================================== -->

    <!-- ============================================================== -->
    <!-- Page wrapper  -->
    <!-- ============================================================== -->
    <div class="page-wrapper bg-white">
                <!-- ============================================================== -->
        <!-- Container fluid  -->
        <!-- ============================================================== -->

  <section class="container-fluid pl-3 pl-md-5 pr-0">
    <div class="row">
      <div class="col-12 col-md-6 d-flex justify-content-center flex-column order-2 order-md-1 pt-5 mt-5 pt-md-0 mt-md-0">
        <p class="font-weight-bold panda-text-high mb-5">
          The smartest way to <br class="d-none d-md-inline">
          train your team and <br class="d-none d-md-inline">
          partner agents
        </p>
        <p class="panda-text">
          Panda provides agents with <span class="font-weight-bold">one powerful platform</span> to access all the sales trainings, marketing materials, admissions procedures and policies of <span class="font-weight-bold"> all the participating schools they represent.</span>
        </p>
        <p class="d-block">Business Email address</p>
        <form class="row" action="https://pandaportal.co/register" method="post">
          <input type="hidden" name="_token" value="XUdERW4H9MPz0v1NPRoaUxyXGSNJRk6o2cHMQMTf">          <div class="col-12 col-md-6 pr-md-0 mb-4 mb-md-0">
            <input type="email" class="panda-input border-dark border-bottom w-100" placeholder="Write your E-mail" name="email" id="email" required>
          </div>
          <div class="col-12 col-md-6">
            <button type="submit" class="panda-btn btn-dark w-100">GET STARTED FOR FREE</button>
          </div>
        </form>
      </div>
      <div class="col-12 col-md-5 offset-0 offset-md-1 pr-0  order-1 order-md-2">
      <img class="img-fluid w-100 position-relative" src="https://pandaportal.co/assets/images/frontend/web.png" alt="">

        <iframe src="https://player.vimeo.com/video/427895932?color=EED429&byline=0&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen id="panda-iframe-video-home" id="panda-iframe-video-home"></iframe>

      </div>
    </div>
  </section>

  <section class="container-fluid">
    <!-- ONE PLACE -->
    <div class="row mt-5 pt-5 justify-content-center">
      <div class="col-12 col-md-5">
        <img class="img-fluid" src="https://pandaportal.co/assets/images/frontend/one-place.png" alt="">
      </div>
      <div class="col-12 col-md-4 offset-0 offset-md-1">
        <h2 class="panda-text font-weight-bold">ONE PLACE</h2>
        <h2 class="panda-text-middle font-weight-bold mb-4">No more “Agent Portal” <br>nobody uses</h2>
        <p class="panda-text">It is hard for agents to keep up with the changing links, login and passwords of every
          school they represent. When trying to access information agents need speed and convenience.</p>
        <p class="panda-text font-weight-bold">Panda brings one single access to everything agents may need from all the
          participating schools they represent.</p>
      </div>
    </div>
    <!-- CONSISTENCY -->
    <div class="row mt-5 pt-5 justify-content-center">
      <div class="col-12 col-md-5 offset-0 offset-md-1 order-2 order-md-1">
        <h2 class="panda-text font-weight-bold">CONSISTENCY</h2>
        <h2 class="panda-text-middle font-weight-bold mb-4">Your staff. Your content.<br> Today.</h2>
        <p class="panda-text">Inside growing student agencies the new staff is often trained by a more experienced peer. The information is often rushed, incomplete and biased towards the schools and programs the trainer likes selling the most.
        </p>
        <p class="panda-text font-weight-bold">Panda allows every new advisor to access complete, consistent first-hand training made by the school.
        </p>
      </div>
      <div class="col-12 col-md-4 offset-0 offset-md-1 order-1 order-md-2">
        <img class="img-fluid" src="https://pandaportal.co/assets/images/frontend/consistency.png" alt="">
      </div>
    </div>

    <!-- SMART DECISIONS -->
    <div class="row my-5 py-5 justify-content-center">
      <div class="col-12 col-md-5">
        <img class="img-fluid" src="https://pandaportal.co/assets/images/frontend/smart.png" alt="">
      </div>
      <div class="col-12 col-md-4 offset-0 offset-md-1">
        <h2 class="panda-text font-weight-bold">SMART DECISIONS</h2>
        <h2 class="panda-text-middle font-weight-bold mb-4">Make educated decisions <br> based on data</h2>
        <p class="panda-text">What percentage of your agents are fully trained? When was the last time they received training? How are your training efforts impacting your bottom line? Traditional agent training strategies are expensive and really hard to track.</p>
        <p class="panda-text font-weight-bold">Panda tracks the information that matters while helping you keep the most updated and curated list of active agents.</p>
      </div>
    </div>
  </section>

  <section class="container-fluid pb-5 panda-bg-low-gray d-none">
    <div class="row">
      <div class="col-10 col-md-3 offset-1 bg-white py-5 mb-0 mb-md-5 pl-5">
        <h2 class="panda-text-high font-weight-bold mb-4">Join the <br>
          movement!</h2>
        <a href="" class="panda-btn btn-dark">GET STARTED FOR FREE</a>
      </div>
      <div class="col-10 offset-1 offset-md-0 col-md-7 bg-white py-5 mb-5 panda-content-logos">
        <img src="https://pandaportal.co/assets/images/frontend/logo-1.png" alt="">
        <img src="https://pandaportal.co/assets/images/frontend/logo-2.png" alt="">
        <img src="https://pandaportal.co/assets/images/frontend/logo-3.png" alt="">
        <img src="https://pandaportal.co/assets/images/frontend/logo-4.png" alt="">
        <img src="https://pandaportal.co/assets/images/frontend/logo-5.png" alt="">
        <img src="https://pandaportal.co/assets/images/frontend/logo-6.png" alt="">
      </div>
    </div>
  </section>

  <section class="container-fluid pt-5 mt-5 mb-5">
    <div class="panda-text-effect panda-rgba-gray">Solutions
      <h2 class="text-center panda-position-center font-weight-bold text-dark">Explore our solutions</h2>
    </div>

    <div class="row justify-content-center pb-5">
      <!-- For Agencies -->
    <a class="col-12 col-md-5" href="https://pandaportal.co/solutions/agents">
        <div class="row align-items-center">
          <div class="col-4">
            <img class="img-fluid" src="https://pandaportal.co/assets/images/frontend/solution-1.png" alt="">
          </div>
          <div class="col-8">
           <div class="d-flex align-items-center mb-4">
             <i class="panda-icon panda-agencies mr-3"></i><h2 class="panda-text-low font-weight-bold">For Agencies</h2>
           </div>
           <p class="panda-text">Stay up-to-date, get certified, build credibility and gain tools to increase sales</p>
          </div>
        </div>
      </a>

      <!-- For Schools -->
      <a class="col-12 col-md-5 offset-0 offset-md-1" href="https://pandaportal.co/solutions/schools">
        <div class="row align-items-center">
          <div class="col-4">
            <img class="img-fluid" src="https://pandaportal.co/assets/images/frontend/solution-2.png" alt="">
          </div>
          <div class="col-8">
           <div class="d-flex align-items-center mb-4">
             <i class="panda-icon panda-schools mr-3"></i><h2 class="panda-text-low font-weight-bold">For Schools</h2>
           </div>
           <p class="panda-text">Stay up-to-date, get certified, build credibility and gain tools to increase sales</p>
          </div>
        </div>
      </a>
    </div>
    <div class="row justify-content-center">

      <!-- Industry Associations -->
      <div class="col-12 col-md-5">
        <div class="row align-items-center">
          <div class="col-4">
            <img class="img-fluid" src="https://pandaportal.co/assets/images/frontend/solution-3.png" alt="">
          </div>
          <div class="col-8">
           <div class="d-flex align-items-center mb-4">
             <i class="panda-icon panda-industry mr-3"></i><h2 class="panda-text-low font-weight-bold">Industry Associations
            </h2>
           </div>
           <p class="panda-text">Coming Soon!</p>
          </div>
        </div>
      </div>

      <!-- Coaches & Services -->
      <div class="col-12 col-md-5 offset-0 offset-md-1">
        <div class="row align-items-center">
          <div class="col-4">
            <img class="img-fluid" src="https://pandaportal.co/assets/images/frontend/solution-4.png" alt="">
          </div>
          <div class="col-8">
           <div class="d-flex align-items-center mb-4">
             <i class="panda-icon panda-industry mr-3"></i><h2 class="panda-text-low font-weight-bold">Coaches & Services
            </h2>
           </div>
           <p class="panda-text">Coming Soon!</p>
          </div>
        </div>
      </div>

    </div>

  </section>

  <section class="container-fluid panda-bg-dark py-5 ">
    <div class="panda-text-effect">How it works
      <h2 class="text-white text-center panda-position-center font-weight-bold">How it works</h2>
    </div>
      <ul class="nav nav-pills mb-5 pb-5 panda-text-low font-weight-bold text-white justify-content-center panda-nav-works" id="pills-tab" role="tablist">
        <li class="nav-item mr-4">
          <a class="position-relative active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Schools</a>
        </li>
        <li class="nav-item">
          <a class="position-relative " id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Agencies</a>
        </li>
      </ul>

    <div class="tab-content" id="pills-tabContent">
      <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
        <div class="row ">
          <div class="col-12 col-md-4 text-white offset-0 offset-md-1">

            <div class="nav flex-column nav-pills panda-text font-weight-bold panda-tabs" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <a class="active" id="v-pills-home-tab" data-toggle="pill" href="#school-tab-1" role="tab" aria-controls="v-pills-home" aria-selected="true">Create your free* account</a>
              <a id="v-pills-profile-tab" data-toggle="pill" href="#school-tab-2" role="tab" aria-controls="v-pills-profile" aria-selected="false">Upload your trainings, files and resources</a>
              <a id="v-pills-profile-tab" data-toggle="pill" href="#school-tab-3" role="tab" aria-controls="v-pills-profile" aria-selected="false">SMART Approval</a>
              <a id="v-pills-messages-tab" data-toggle="pill" href="#school-tab-4" role="tab" aria-controls="v-pills-messages" aria-selected="false">Segment your content</a>
              <a id="v-pills-settings-tab" data-toggle="pill" href="#school-tab-5" role="tab" aria-controls="v-pills-settings" aria-selected="false">Live Reporting</a>
              <a id="v-pills-settings-tab" data-toggle="pill" href="#school-tab-6" role="tab" aria-controls="v-pills-settings" aria-selected="false">Build relationships</a>

            </div>
          </div>
          <div class="col-12 col-md-6 mt-5 mt-md-0">
            <div class="tab-content panda-text text-white" id="v-pills-tabContent">
              <div class="tab-pane fade show active" id="school-tab-1" role="tabpanel" aria-labelledby="v-pills-home-tab">Create your school profile in a few simple steps. Your profile will remain visible to existing and potential partner agents.</div>
              <div class="tab-pane fade" id="school-tab-2" role="tabpanel" aria-labelledby="v-pills-profile-tab">Get maximum results following our proven methodology. We will guide you on how to produce high-quality videos regardless of your current video equipment.</div>
              <div class="tab-pane fade" id="school-tab-3" role="tabpanel" aria-labelledby="v-pills-messages-tab">Set up rules for recognizing which users are part of your organization and which are your approved partner agents. You can decide how new users are automatically assigned to specific segments in your training.</div>
              <div class="tab-pane fade" id="school-tab-4" role="tabpanel" aria-labelledby="v-pills-settings-tab">Decide which users have access to which of your contents. For instance you can create training only for your own staff, training in Spanish only for agents in Latin America and training in English for partner agents in the rest of the world.</div>
              <div class="tab-pane fade" id="school-tab-5" role="tabpanel" aria-labelledby="v-pills-settings-tab">Check which agents are signing up to your training, their completion rate and when they are disengaging.
              </div>
              <div class="tab-pane fade" id="school-tab-6" role="tabpanel" aria-labelledby="v-pills-settings-tab">Allow your sales & recruitment teams to spend less in repetitive training and answering repetitive questions and focus on building relationships helping agents reach their sales targets.
              </div>
            </div>
            <!-- <p class="panda-text text-white">Create your school profile in a few simple steps. Your profile will remain visible to existing and potential partner agents.</p> -->
          </div>
        </div>
      </div>
      <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
        <div class="tab-content" id="pills-tabContent">
          <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
            <div class="row ">
              <div class="col-12 col-md-4 text-white offset-0 offset-md-1">

                <div class="nav flex-column nav-pills panda-text font-weight-bold panda-tabs" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                  <a class="active" id="v-pills-home-tab" data-toggle="pill" href="#agent-tab-1" role="tab" aria-controls="v-pills-home" aria-selected="true">Create your free* account
                  </a>
                  <a id="v-pills-profile-tab" data-toggle="pill" href="#agent-tab-2" role="tab" aria-controls="v-pills-profile" aria-selected="false">SMART Approval</a>
                  <a id="v-pills-profile-tab" data-toggle="pill" href="#agent-tab-3" role="tab" aria-controls="v-pills-profile" aria-selected="false">Get your team certified                  </a>
                  <a id="v-pills-messages-tab" data-toggle="pill" href="#agent-tab-4" role="tab" aria-controls="v-pills-messages" aria-selected="false">Join the Panda Training Movement
                  </a>


                </div>
              </div>
              <div class="col-12 col-md-6 mt-5 mt-md-0">
                <div class="tab-content panda-text text-white" id="v-pills-tabContent">
                  <div class="tab-pane fade show active" id="agent-tab-1" role="tabpanel" aria-labelledby="v-pills-home-tab">Create your agent profile in a few simple steps. Your profile will stay visible for your existing and potential partner schools.
                  </div>
                  <div class="tab-pane fade" id="agent-tab-2" role="tabpanel" aria-labelledby="v-pills-profile-tab">Set up rules for recognizing which users are part of your organization. You can decide how new users are automatically assigned to specific segments in your trainings.                   </div>
                  <div class="tab-pane fade" id="agent-tab-3" role="tabpanel" aria-labelledby="v-pills-messages-tab">Every time you finish a training a certification gets created which you can use to build credibility with your clients offline and online. Agencies with a good portion of their staff trained gain attention of the schools for further marketing initiatives.
                  </div>
                  <div class="tab-pane fade" id="agent-tab-4" role="tabpanel" aria-labelledby="v-pills-settings-tab">It is exciting to be able to get your new staff training on the schools you represent from day one. But how about teaching them on how to use your CRM, what's your company's vision, sales processes and procedures, etc.
                  <br><br>
                  Now you can do onboarding training in a simple way while monitoring their completion rate and engagement.
                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>


  </section>


  <section class="container-fluid panda-bg-low-gray position-relative py-15 overflow-hidden">
    <div class="panda-shape-1"></div>
    <div class="panda-shape-2"></div>

    <div class="row justify-content-center">
      <div class="col-12 col-md-6">
      <h2 class="panda-text-high text-center font-weight-bold mb-4">The smartest way to <br class="d-none d-md-inline-block">
        train your team and <br class="d-none d-md-inline-block">
        partner agents  </h2>
        <p class="d-block mt-5">Business Email address</p>
        <form class="row" action="https://pandaportal.co/register" method="post">
          <input type="hidden" name="_token" value="XUdERW4H9MPz0v1NPRoaUxyXGSNJRk6o2cHMQMTf">          <div class="col-12 col-md-6 pr-md-0 mb-4 mb-md-0">
            <input type="email" class="panda-input border-dark border-bottom w-100 bg-white" placeholder="Write your E-mail" name="email">
          </div>
          <div class="col-12 col-md-6">
            <button type="submit" class="panda-btn btn-dark w-100">GET STARTED FOR FREE</button>
          </div>
        </form>
      </div>
    </div>
  </section>
      <!-- ============================================================== -->
        <!-- End Container fluid  -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- footer -->
        <!-- ============================================================== -->
    <footer class="container-fluid px-3 px-md-5 pt-5">
    <nav class="nav align-items-center justify-content-center justify-content-start">
    <a href="index.php" class="panda-nav-logo position-relative">
        <img class="img-fluid panda-position-center" src="https://pandaportal.co/assets/images/logo-icon.png" alt="logo">
    </a>
      <div class="d-none d-md-flex text-center text-md-right ml-0 ml-md-auto">
      <a class="nav-link active ml-auto" href="#">THE ACADEMY</a>
      <a class="nav-link" href="#">SOLUTIONS</a>
      <a class="nav-link" href="#">ABOUT</a>
      <a class="nav-link" href="#">CONTACT US</a>
      </div>
    </nav>
    <nav class="nav align-items-center py-3 flex-column flex-md-row text-center">
      <span class="nav-link">Copyrigh 2020. All rights reserved.</span>
    <a class="ml-0 ml-md-auto nav-link" href="https://pandaportal.co/terms_and_conditions">Terms and Conditions </a>
    <a class="nav-link" href="https://pandaportal.co/privacy_policy">Privacy Policy</a>
    </nav>
  </footer>    <!-- ============================================================== -->
        <!-- End footer -->
        <!-- ============================================================== -->
    </div>
    <!-- ============================================================== -->
    <!-- End Page wrapper  -->
    <!-- ============================================================== -->
</div>
<!-- ============================================================== -->
<!-- End Wrapper -->
<!-- ============================================================== -->
<!-- ============================================================== -->
<!-- All Jquery -->
<!-- ============================================================== -->
<!-- ============================================================== -->
<script src="https://pandaportal.co/assets/libs/jquery/dist/jquery.min.js"></script>
<script src="https://pandaportal.co/assets/libs/popper.js/dist/umd/popper.min.js"></script>
<script src="https://pandaportal.co/assets/libs/bootstrap/dist/js/bootstrap.min.js"></script>
<script>
    $(document).on('click', '.show-modal-register', function(event){
      event.preventDefault();
      $('#emailModal').modal('show');
    });
  </script>
    <script>
      $('#collapseSolutions').on('shown.bs.collapse', function () {
        $('.fa-arrow-down').addClass('d-none');
        $('.fa-arrow-up').removeClass('d-none');
      });

      $('#collapseSolutions').on('hidden.bs.collapse', function () {
        $('.fa-arrow-up').addClass('d-none');
        $('.fa-arrow-down').removeClass('d-none');
    });
    </script>

</body>`;

export default html;
