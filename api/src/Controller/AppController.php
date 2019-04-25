<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
    /**
     * @Route("/app", name="app")
     */
    public function index()
    {
        $var1 = 'Youpi';

        return $this->render('index.html.twig', array(
            'var1' => $var1,
        ));
    }
}
